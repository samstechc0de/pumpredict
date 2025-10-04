export default {
  async fetch(request: Request, env: any) {
    const url = new URL(request.url);
    // Markets endpoint: return dummy markets for token
    if (url.pathname === "/markets") {
      const token = url.searchParams.get("token") || "";
      const markets = getDummyMarkets(token);
      return new Response(JSON.stringify({ markets }), {
        headers: { "content-type": "application/json" },
      });
    }
    // Bet endpoint: returns memo for placeholder transaction
    if (url.pathname === "/bet" && request.method === "POST") {
      const body = await request.json();
      const memo = `PREDICT|${body.marketId}|${body.side}|${body.amount}`;
      return new Response(JSON.stringify({ memo }), {
        headers: { "content-type": "application/json" },
      });
    }
    // Webhook endpoint: accept proposals, respond with ok
    if (url.pathname === "/webhook" && request.method === "POST") {
      const payload = await request.json();
      const received = payload.proposals ? payload.proposals.length : 0;
      return new Response(JSON.stringify({ ok: true, received }), {
        headers: { "content-type": "application/json" },
      });
    }
    return new Response("Not Found", { status: 404 });
  },
};

// Helper: returns sample markets for a given token
function getDummyMarkets(token: string) {
  const t = token.toUpperCase() || "TOKEN";
  return [
    {
      id: `mk_${t}_bond`,
      title: `Will $${t} bond on Pump.fun by Dec 31, 2025?`,
      yes_prob: 0.5,
      no_prob: 0.5,
      volume_sol: 0,
      deadline_utc: "2025-12-31T23:59:59Z",
      traders_count: 0,
    },
    {
      id: `mk_${t}_mc`,
      title: `$${t} market cap at Dec 31, 2025`,
      yes_prob: 0.5,
      no_prob: 0.5,
      volume_sol: 0,
      deadline_utc: "2025-12-31T23:59:59Z",
      traders_count: 0,
    },
  ];
}
