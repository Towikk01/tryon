import crypto from "node:crypto";

const API_BASE = "https://api.monobank.ua";

function token(): string {
  const t = process.env.MONO_TOKEN;
  if (!t) throw new Error("MONO_TOKEN is not set");
  return t;
}

type MerchantPaymInfo = {
  reference: string;
  destination: string;
};

type CreateInvoiceParams = {
  /** Сума в копійках (мінімальні одиниці валюти) */
  amount: number;
  reference: string;
  destination: string;
  redirectUrl: string;
  webHookUrl: string;
  /** Час життя інвойсу в секундах (за замовч. 24 год у Mono) */
  validity?: number;
};

export type CreateInvoiceResult = {
  invoiceId: string;
  pageUrl: string;
};

export async function createInvoice(
  params: CreateInvoiceParams,
): Promise<CreateInvoiceResult> {
  const body: {
    amount: number;
    ccy: number;
    merchantPaymInfo: MerchantPaymInfo;
    redirectUrl: string;
    webHookUrl: string;
    validity?: number;
  } = {
    amount: params.amount,
    ccy: 980, // UAH
    merchantPaymInfo: {
      reference: params.reference,
      destination: params.destination,
    },
    redirectUrl: params.redirectUrl,
    webHookUrl: params.webHookUrl,
  };
  if (params.validity) body.validity = params.validity;

  const res = await fetch(`${API_BASE}/api/merchant/invoice/create`, {
    method: "POST",
    headers: {
      "X-Token": token(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Mono create invoice failed: ${res.status} ${text}`);
  }

  return (await res.json()) as CreateInvoiceResult;
}

export type InvoiceStatus =
  | "created"
  | "processing"
  | "hold"
  | "success"
  | "failure"
  | "reversed"
  | "expired";

export type WebhookPayload = {
  invoiceId: string;
  status: InvoiceStatus;
  amount: number;
  ccy: number;
  reference?: string;
  modifiedDate?: string;
};

// Публічний ключ змінюється рідко — кешуємо в пам'яті процесу.
let cachedPubKeyPem: string | null = null;

async function getPublicKeyPem(): Promise<string> {
  if (cachedPubKeyPem) return cachedPubKeyPem;

  const res = await fetch(`${API_BASE}/api/merchant/pubkey`, {
    headers: { "X-Token": token() },
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Mono pubkey fetch failed: ${res.status}`);
  }
  const data = (await res.json()) as { key: string };
  // key — base64 від PEM-рядка
  cachedPubKeyPem = Buffer.from(data.key, "base64").toString("utf8");
  return cachedPubKeyPem;
}

/**
 * Перевіряє підпис вебхука Mono.
 * @param rawBody сирий (незмінений) текст тіла запиту
 * @param xSign значення заголовка X-Sign (base64 ECDSA-підпис)
 */
export async function verifyWebhook(
  rawBody: string,
  xSign: string,
): Promise<boolean> {
  if (!xSign) return false;
  try {
    const pubKeyPem = await getPublicKeyPem();
    const signature = Buffer.from(xSign, "base64");
    const verify = crypto.createVerify("SHA256");
    verify.update(rawBody);
    verify.end();
    return verify.verify(pubKeyPem, signature);
  } catch {
    return false;
  }
}
