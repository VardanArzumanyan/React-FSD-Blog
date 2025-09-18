import React from "react";
import type { PostDTO } from "../../model/postsService";
import "./PostCard.css";

type Props = {
  post: PostDTO;
  onClick: () => void;
};

const PostCard: React.FC<Props> = ({ post, onClick }) => {
  return (
    <article
      className="post-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter") onClick();
      }}
    >
      <img
        className="post-image"
        src={post.img}
        srcSet={`${post.img_2x} 2x`}
        alt={post.title}
      />
      <div className="post-body">
        <div className="post-meta">{post.tags}</div>
        <h3 className="post-title">{post.title}</h3>
        <p className="post-excerpt">{post.text}</p>
      </div>
    </article>
  );
};

export default PostCard;
