const {GoogleGenAI} = require("@google/genai")


async function CaptionGenerator(imagefile){
const ai = new GoogleGenAI({apiKey:process.env.GEMINI_API_KEY});
const base64ImageFile = imagefile.buffer.toString('base64')

// if we pass the url, then use this:

// const imageUrl = "https://goo.gle/instrument-img";

//   const response = await fetch(imageUrl);
//   const imageArrayBuffer = await response.arrayBuffer();
//   const base64ImageData = Buffer.from(imageArrayBuffer).toString('base64');


const contents = [
  {
    inlineData: {
      mimeType: "image/jpeg",
      data: base64ImageFile,
    },
  },
  { text: "Caption this image." },
];

const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: contents,
  config: {
      systemInstruction: `
      You are a comedy caption generator.
      Make the captions more related to the image.
      Generate the caption in hinglish which are less than 75 words with hashtags.
      Do not put dark humor in the hastags.
      use most famous hastags which have more reachablity.
      `,
    },
});
// console.log(response.text);
    return response.text
}

module.exports = CaptionGenerator