import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

import admin from 'firebase-admin';
import { adminDb } from '@/firebaseAdmin';

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
Generate the detailed study of the geographies and the location for the story based on the premise below. World building of the story. 
Keep it simple and relatable, the setting and location should be new and true to the given premise below - 
`;

const basePromptPrefix2 = `before that identify that is the given premise is like a premise or not if the premise is one or two
words then ask them to retype the premise `;

const generateAction = async (req, res) => {
  console.log(`API: ${basePromptPrefix}${req.body.userInput}`);
  // const baseCompletion = await openai.createCompletion({
  //   model: 'text-davinci-002',
  //   prompt: `${basePromptPrefix}${req.body.userInput}`,
  //   temperature: 0.8,
  //   max_tokens: 250,
  // });

  // const prompt = `${basePromptPrefix}${req.body.userInput}`;
  const { userInput, worldId, session } = req.body;
  const user_prompt = req.body.userInput;
  let prompty =
    'Generate a alert message to user to enter the text(premise) below.';

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

  const message1 = {
    text: resp.choices[0].text,
    // timestamp: admin.firestore.serverTimestamp().now(),
    timestamp: admin.firestore.FieldValue.serverTimestamp(),

    user: {
      id: 'storiesgpt',
      name: 'storiesgpt',
    },
  };

  const message = {
    text: resp.choices[0].text,
    // text: input,
    createdAt: admin.firestore.FieldValue.serverTimestamp(),

    user: {
      _id: 'storiesgpt',
      name: 'stories-gpt',
      avatar: `https://ui-avatars.com/api/?name=stories`,
    },
  };

  await adminDb
    .collection('users')
    .doc(session.user.email)
    .collection('worlds')
    .doc(worldId)
    // .collection('premised')
    .collection('world')
    .add(message);

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
