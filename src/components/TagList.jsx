import { Link } from 'react-router-dom';
import posts from '../data/posts';

const TagList = () => {
  // Dynamically generate tags from posts
  const allTags = [...new Set(posts.flatMap(post => post.tags))];

  return (
    <div className="flex flex-wrap gap-3">
      {allTags.map(tag => (
        <Link
          key={tag}
          to={`/tags`}
          className="px-3 py-1 text-sm border border-green-500/50 text-green-400 rounded hover:border-green-400 hover:bg-green-500/10 transition"
        >
          #{tag}
        </Link>
      ))}
    </div>
  );
};

export default TagList;
