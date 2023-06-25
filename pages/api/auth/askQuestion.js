import query from '@/lib/queryApi';

export async function handler(req, res) {
  // const { prompt, chatId, model, session } = req.body;

  const prompt = 'Modi';
  const model = 'text-davinci-002';

  if (!prompt) {
    res.status(400).json({ answer: 'please provide a prompt' });
    return;
  }

  if (!chatId) {
    res.status(400).json({ answer: 'please provide a chatId' });
    return;
  }

  const response = await query(prompt, model);
  res.status(200).json({ name: 'n=bomb' });
}
