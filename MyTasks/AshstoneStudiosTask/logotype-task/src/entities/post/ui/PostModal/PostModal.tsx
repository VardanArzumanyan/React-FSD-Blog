import React, { useEffect } from "react";
import type { PostDTO } from "../../../../features/posts/model/postsService";
import "./PostModal.css";

type Props = {
  post: PostDTO;
  onClose: () => void;
};

const PostModal: React.FC<Props> = ({ post, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-label={post.title}
      >
        <div className="modal-header">
          <h3 className="modal-title">{post.title}</h3>
          <button className="modal-close" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="modal-body">
          <p>{post.text}</p>
          <div className="modal-meta">
            <span>{post.autor}</span> • <span>{post.date}</span> •{" "}
            <span>{post.views} views</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
