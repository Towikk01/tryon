#!/usr/bin/env bash
# Прогон API CoursesSalesBot (бот бро). URL і ключ беруться з .env.local.
# Запуск:  bash scripts/test-bot.sh
set -u

ENV_FILE="$(dirname "$0")/../.env.local"
BOT=$(grep '^COURSES_BOT_API_URL=' "$ENV_FILE" | cut -d= -f2-)
KEY=$(grep '^COURSES_BOT_API_KEY=' "$ENV_FILE" | cut -d= -f2-)
COURSE=$(grep '^COURSES_BOT_COURSE_ID=' "$ENV_FILE" | cut -d= -f2-)
H=(-H "x-api-key: $KEY" -H "Content-Type: application/json")

# унікальний payment_id на запуск (для тесту ідемпотентності)
PID="testpay-$(date +%s)"

req() { # method path [data]
  local m="$1" p="$2" d="${3:-}"
  local args=(-s -X "$m" "$BOT$p" "${H[@]}" --max-time 12 -w $'\n[HTTP %{http_code}]\n')
  [ -n "$d" ] && args+=(-d "$d")
  local out; out=$(curl "${args[@]}")
  if echo "$out" | grep -q "ERR_NGROK"; then
    echo "  ⚠️  ngrok OFFLINE — підніми тунель бро"; return 1
  fi
  echo "$out"
}

sep() { echo; echo "──────── $1"; }

sep "0. health"; req GET /health
sep "1. AUTH без ключа → 401"
curl -s -X POST "$BOT/api/tokens" -H "Content-Type: application/json" \
  -d '{"payment_id":"x","course_ids":["'"$COURSE"'"]}' --max-time 12 -w $'\n[HTTP %{http_code}]\n'
sep "2. список курсів"; req GET /api/courses
sep "3. курс $COURSE"; req GET "/api/courses/$COURSE"
sep "4. неіснуючий курс → 404"; req GET /api/courses/zzz-nope

sep "5. токен (payment_id=$PID) — перший раз"
req POST /api/tokens '{"payment_id":"'"$PID"'","course_ids":["'"$COURSE"'"]}'
sep "6. ІДЕМПОТЕНТНІСТЬ: той самий payment_id ще раз (той самий токен? дубль? 409?)"
req POST /api/tokens '{"payment_id":"'"$PID"'","course_ids":["'"$COURSE"'"]}'

sep "7. токен через course_id (single) замість course_ids"
req POST /api/tokens '{"payment_id":"'"$PID"'-single","course_id":"'"$COURSE"'"}'
sep "8. токен без payment_id (валідація?)"
req POST /api/tokens '{"course_ids":["'"$COURSE"'"]}'
sep "9. токен без курсу взагалі → 422?"
req POST /api/tokens '{"payment_id":"'"$PID"'-nocourse"}'

sep "10. access/check (telegram_id=1, course=$COURSE) → has_access=false"
req GET "/api/access/check?telegram_id=1&course_id=$COURSE"
sep "11. bulk access/check"
req POST /api/access/check '{"telegram_id":1,"course_ids":["'"$COURSE"'"]}'

echo; echo "==== готово ===="
