const TOKEN = "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";
const GIST_ID = "13f0bec225416e0e4323603d902a19f8";
const GIST_FILENAME = "productos.json";

async function getData() {
    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`);
    const gist = await req.json();
    return JSON.parse(gist.files[GIST_FILENAME].content);
}

export async function setData(data) {
    const req = await fetch(`https://api.github.com/gists/${GIST_ID}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        files: {
          [GIST_FILENAME]: {
            content: JSON.stringify(data),
          },
        },
      }),
    });
  
    return req.json();
  }

