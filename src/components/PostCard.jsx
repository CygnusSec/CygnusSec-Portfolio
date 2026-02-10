const PostCard = ({ post }) => (
  <article className="border-l-2 border-green-500 pl-4">
    <a href={`/post/${post.slug}`}>
      <h2 className="text-green-400 font-mono text-xl">
        {post.title}
      </h2>
    </a>
    <p className="text-gray-400 text-sm mt-1">
      {post.date} · {post.tags.join(', ')}
    </p>
    <p className="text-gray-300 mt-2">
      {post.excerpt}
    </p>
  </article>
);

export default PostCard;
