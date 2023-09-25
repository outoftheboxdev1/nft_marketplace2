import { put } from '@vercel/blob';

export default async function handler(request, response) {
  const currentAccount = request.body.get('user');
  const file = request.files.file[0];
  const filename = `${currentAccount}.png`;

  const blob = await put(filename, file, {
    access: 'public',
  });

  return response.status(200).json(blob);
}
