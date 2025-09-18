import React, { useEffect, useState } from "react";
import { fetchPosts, type PostDTO } from "../../model/postsService";
import PostCard from "../PostCard/PostCard";
import PostModal from "../../../../entities/post/ui/PostModal/PostModal";
import "./PostsList.css";

const PostsList: React.FC = () => {
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [query, setQuery] = useState<string>("");
  const [selected, setSelected] = useState<PostDTO | null>(null);

  useEffect(() => {
    let mounted = true;
    fetchPosts()
      .then((data) => {
        if (mounted) {
          setPosts(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (mounted) {
          setError(String(err.message || err));
          setLoading(false);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  const filtered = posts.filter((p) => {
    const q = query.trim().toLowerCase();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) || p.text.toLowerCase().includes(q)
    );
  });

  return (
    <div className="container posts-wrap">
      <div className="posts-header">
        <input
          className="search-input"
          type="search"
          placeholder="Search posts..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      {loading && <div className="status">Loading posts…</div>}
      {error && <div className="status status--error">Error: {error}</div>}

      <div className="posts-grid" role="list">
        {filtered.map((p, idx) => (
          <div key={idx} className="post-item" role="listitem">
            <PostCard post={p} onClick={() => setSelected(p)} />
          </div>
        ))}
      </div>

      {selected && (
        <PostModal post={selected} onClose={() => setSelected(null)} />
      )}
    </div>
  );
};

export default PostsList;
