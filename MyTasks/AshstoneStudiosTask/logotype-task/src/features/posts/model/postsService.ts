export type PostDTO = {
  title: string;
  text: string;
  tags: string;
  autor: string;
  img: string;
  img_2x: string;
  date: string;
  views: string;
};

export async function fetchPosts(): Promise<PostDTO[]> {
  const resp = await fetch(
    "https://cloud.codesupply.co/endpoint/react/data.json"
  );
  if (!resp.ok) throw new Error("Failed to fetch posts");
  return resp.json();
}
