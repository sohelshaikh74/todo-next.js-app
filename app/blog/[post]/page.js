export default function page({ params }) {
  return (
    <div>
      <h1> Post : {params.post}</h1>
    </div>
  );
}

export async function generateMetadata({ params }) {
  return {
    title: `${params.post.split("-").join(" ")}`, // Dynamically set the title based on the post parameter
  };
}
