const tags = ['IDS', 'Snort', 'Linux', 'Blue Team', 'Research'];

const TagList = () => (
  <div className="mt-12 flex flex-wrap gap-3">
    {tags.map(tag => (
      <span
        key={tag}
        className="px-3 py-1 text-sm border border-green-500 text-green-400 rounded"
      >
        #{tag}
      </span>
    ))}
  </div>
);

export default TagList;