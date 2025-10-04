export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    if (url.pathname.startsWith('/markets')) {
      const token = url.searchParams.get('token') || 'token';
      const markets = [
        { id: 'm1', title: `Will ${token} bond by tomorrow?` },
        { id: 'm2', title: `${token} market cap at EOD` }
      ];
      return new Response(JSON.stringify({ markets }), { headers: { 'Content-Type': 'application/json' }});
    }
    if (url.pathname === '/bet' && request.method === 'POST') {
      const body = await request.json();
      const memo = `PREDICT|${body.market_id}|${body.side}|${body.amount}`;
      return new Response(JSON.stringify({ memo }), { headers: { 'Content-Type': 'application/json' }});
    }
    return new Response('Not found', { status: 404 });
  }
};
