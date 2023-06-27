import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

// const basePromptPrefix = `Write me a detailed table of contents for a blog post with the title below.

// Title:`;
// const generateAction = async (req, res) => {
//   // Run first prompt
//   console.log(`API: ${basePromptPrefix}${req.body.userInput}`);

//   const baseCompletion = await openai.createCompletion({
//     model: "text-davinci-002",
//     prompt: `${basePromptPrefix}${req.body.userInput}\n`,
//     temperature: 0.7,
//     max_tokens: 1250,
//   });

//   const basePromptOutput = baseCompletion.data.choices.pop();

//   res.status(200).json({ output: basePromptOutput });
// };

// export default generateAction;

const basePromptPrefix = `
Generate characters along with thier character description for a long story and screenplay 
(Develop strong characters according to the premise and each description should be atleast of 100 words) , 
based on the following premise - 
`;

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  // const baseCompletion = await openai.createCompletion({
  //   model: 'text-davinci-002',
  //   prompt: `${basePromptPrefix}${req.body.userInput}`,
  //   temperature: 0.8,
  //   max_tokens: 250,
  // });

  // const prompt = `${basePromptPrefix}${req.body.userInput}`;
  const user_prompt = req.body.userInput;
  let prompty =
    'Generate a alert message to user to enter the text(premise) above.';

  if (user_prompt) {
    prompty = `${basePromptPrefix}${req.body.userInput}`;
  }

  const resp = await openai
    .createCompletion({
      // model: 'gpt-3.5-turbo',
      model: 'text-davinci-003',
      prompt: prompty,
      temperature: 0.7,
      top_p: 1,
      max_tokens: 1000,
      frequency_penalty: 0.0,
      presence_penalty: 0.0,

      // model: 'text-davinci-003',
      // prompt: 'Say this is a test',
      // max_tokens: 7,
      // temperature: 0,
    })
    .then((res) => res.data)
    // .then((res) => res.data.choices[0].text)
    .catch(
      (err) =>
        `CHATGPT was unable to find an answer for that , ERROR : ${err.message}`
    );

  // const basePromptOutput = baseCompletion.data.choices;
  // const basePromptOutput = baseCompletion.data.choices.pop();

  // I build Prompt #2.
  // const secondPrompt = `
  // Take the table of contents and title of the blog post below and generate a blog post written in the style of Paul Graham. Make it feel like a story. Don't just list the points. Go deep into each one. Explain why.

  // Title: ${req.body.userInput}
  // Table of Contents: ${basePromptOutput.text}

  // Blog Post:
  // `;

  // // I call the OpenAI API a second time with Prompt #2
  // const secondPromptCompletion = await openai.createCompletion({
  //   model: 'text-davinci-002',
  //   prompt: `${secondPrompt}`,

  //   temperature: 0.85,
  //   // increase max_tokens.
  //   max_tokens: 1250,
  // });

  // // Get the output
  // const secondPromptOutput = secondPromptCompletion.data.choices.pop();

  // console.log(resp);
  let n = 0;

  // Send over the Prompt #2's output to our UI instead of Prompt #1's.
  res.status(200).json({ output: resp.choices[0] });
  // res.status(200).json({ output: secondPromptOutput });
};

export default generateAction;
