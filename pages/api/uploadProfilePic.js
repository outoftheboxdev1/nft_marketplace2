import { put } from '@vercel/blob';

export default async function handler(request, response) {
  const { user } = request.query;
  //   const currentAccount = request.body.get('user');
  const file = request.files.file[0];
  const filenameOutput = `${user}.png`;

  const blob = await put(filenameOutput, file, {
    access: 'public',
  });
  return response.status(200).json(blob);
}
