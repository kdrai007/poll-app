export const Tags = ({ tags, setSelectedTag, selectedTag }) => {
  if (tags.length === 0) {
    return null;
  }
  return (
    <div className="container mx-20 d-flex gap-2  tag-div">
      <div onClick={() => setSelectedTag("all")} className={`badge  cursor-pointer  ${selectedTag === "all" ? "text-bg-primary" : "text-bg-secondary"}`}>All</div>
      {tags.map((tag, index) => <div onClick={() => setSelectedTag(tag._id)} className={`badge  ${selectedTag === tag._id ? "text-bg-primary" : "text-bg-secondary"} `} key={index}>{tag.tag}</div>)}
    </div>
  )
}
