const revalidate = async (url: string) => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const revalidateToken = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN;

  const res = await fetch(
    `${baseUrl}/api/revalidate?path=${url}&secret=${revalidateToken}`
  );
  const data = res.json();

  return data;
};

export default revalidate;
