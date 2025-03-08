export function request(ctx) {
    const { input } = ctx.args;
    console.log("kbResolver", input);
    return {
      resourcePath: "/knowledgebases/WGM61WNU6K/retrieve",
      method: "POST",
      params: {
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          retrievalQuery: {
            text: input,
          },
        }),
      },
    };
  }
  
  export function response(ctx) {
    return JSON.stringify(ctx.result.body);
  }
  
