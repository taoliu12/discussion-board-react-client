import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import NewCommentForm from "./NewCommentForm";
import { Box, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useUser } from './UserContext';

export default function Comment({ comment, setComments }) {
  const { loggedInUser } = useUser();
  const [toggleReplyForm, setToggleReplyForm] = useState(false);

  const displayReplyForm = () => {
    setToggleReplyForm(true);
  };
  const hideReplyForm = () => {
    setToggleReplyForm(false);
  };

  return (
    <>
      <Card
        className="comment-card"
        sx={{
          textAlign: "left",
          borderWidth: "1px",
          borderColor: "#cccccc",
          backgroundColor: "white",
          marginY: "15px",
          paddingX: "15px",
        }}
        variant="outlined"
      >
        <p>{comment.attributes.content}</p>
        <p>
          {comment.attributes.author_name} -{" "}
          {comment.attributes.formatted_created_at}
        </p>
        {loggedInUser && <Button onClick={displayReplyForm}>Reply</Button>}
      </Card>
      {toggleReplyForm && (
        <Box>           
            <NewCommentForm
              hideReplyForm={hideReplyForm}
              parentCommentId={comment.id}
              setComments={setComments}
            />           
          {/* <IconButton onClick={hideReplyForm} sx={{ width: 50, height: 50 }}>
            <CloseIcon />
          </IconButton> */}
        </Box>
      )}

      {comment.attributes.child_comments && (
        <Box sx={{ pl: 3 }}>
          {comment.attributes.child_comments.map((child_comment) => (
            <Comment
              comment={child_comment.data}
              setComments={setComments}
              key={child_comment.id}
            />
          ))}
        </Box>
      )}
    </>
  );
}