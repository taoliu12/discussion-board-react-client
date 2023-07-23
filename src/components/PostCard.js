import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import VotesBox from "./VotesBox";
import Card from "@mui/material/Card";
import { Box } from "@mui/material";

export default function PostCard({ post, loggedInUser }) {
  const [votes_total, setVotesTotal] = useState(post.attributes.votes_total);
  const [currentUserVote, setCurrentUserVote] = useState({ value: null });
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const getAndSetCurrentUserVote = (post) => {
    setCurrentUserVote({ value: null });
    post.votes.forEach((vote) => {
      if (vote.user_id == loggedInUser.id) {
        //find the currentUser's vote
        setCurrentUserVote(vote);
      }
    });
  };

  useEffect(() => {
    setVotesTotal(post.attributes.votes_total);
    // debugger
    loggedInUser && getAndSetCurrentUserVote(post.attributes);
  }, [loggedInUser, post]);

  return (
    <Card
      className="post-card"
      sx={{
        display: "flex",
        textAlign: "center",
        borderWidth: "1px",
        borderColor: "#cccccc",
        marginY: "10px",
      }}
      variant="outlined"
    >
      <Box
        sx={{ py: 1, backgroundColor: "#f8f9fa" }}
        className="votesBox-container"
      >
        <VotesBox post={post} loggedInUser={loggedInUser} />
      </Box>

      <Box
        sx={{
          py: 2,
          px: 3,
          flex: 4,
          textAlign: "left",
        }}
      >
        <NavLink
          className="post-title-link"
          to={`/posts/${post.id}`}
          style={{
            fontSize: 20,
            fontWeight: "bold",
          }}
          underline="hover"
        >
          {post.attributes.title}
        </NavLink>
        <div className="text-container">
          <p>{post.attributes.body}</p>
          <div className="text-gradient"></div>
        </div>
        <p>
          Posted on {post.attributes.formatted_created_at}, by{" "}
          {post.attributes.author_name}
        </p>
      </Box>
    </Card>
  );
}
