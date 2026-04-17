import { useParams } from 'react-router-dom';
import posts from '../data/posts';

const Post = () => {
  const { slug } = useParams();
  const post = posts.find(p => p.slug === slug);

  if (!post) return <p>Post not found</p>;

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-mono text-green-400">
        {post.title}
      </h1>

      <p className="text-sm text-gray-400 mt-2">
        {post.date} · {post.tags.join(', ')}
      </p>

      <div className="mt-8 text-gray-300 leading-relaxed">
        {/* Nội dung bài viết sau này chuyển sang Markdown */}
        <p>Post content goes here...</p>
      </div>
    </article>
  );
};

export default Post;
