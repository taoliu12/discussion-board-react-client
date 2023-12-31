import React, { useState } from "react";
import Card from "@mui/material/Card";
import NestedCommentForm from "./NestedCommentForm";
import { Box, Button } from "@mui/material";
import { IconButton } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandIcon from "@mui/icons-material/Expand";

import { useUser } from "./UserContext";

export default function Comment({ comment, setComments }) {
  const { loggedInUser } = useUser();
  const [toggleReplyForm, setToggleReplyForm] = useState(false);
  const [toggleExpand, setToggleExpand] = useState(true);

  const displayReplyForm = () => {
    setToggleReplyForm(true);
  };
  const hideReplyForm = () => {
    setToggleReplyForm(false);
  };
  const handleToggleExpand = () => {
    if (toggleExpand) {
      setToggleExpand(false);
    } else {
      setToggleExpand(true);
    }
  };

  const commentContainer = (
    <Box sx={{ display: "flex" }}>
      <Box
        sx={{
          textAlign: "center",
          width: 5,
          pt: "6px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton sx={{ color: "gray" }} onClick={handleToggleExpand}>
          <ExpandMoreIcon />
        </IconButton>
        <Box
          onClick={handleToggleExpand}
          sx={{
            backgroundColor: "#ccc",
            flex: 1,
            width: "3px",
            "&:hover": {
              cursor: "pointer",
              border: "2px solid currentColor",
            },
          }}
        />
      </Box>
      <Box sx={{ flex: 1 }}>
        <Card
          className="comment-card"
          sx={{
            textAlign: "left",
            borderWidth: "0px",
            borderColor: "#cccccc",
            backgroundColor: "white",
            marginY: "0px",
            paddingX: "15px",
            paddingY: "0px",
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
          <Box sx={{ pl: 2, width: "100%" }}>
            <NestedCommentForm
              hideReplyForm={hideReplyForm}
              parentCommentId={comment.id}
              setComments={setComments}
            />
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
      </Box>
    </Box>
  );

  return toggleExpand ? (
    commentContainer
  ) : (
    <Box sx={{ backgroundColor: "transparent", display: "flex" }}>
      <Box
        sx={{
          backgroundColor: "transparent",
          textAlign: "center",
          width: 5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <IconButton onClick={handleToggleExpand}>
          <ExpandIcon />
        </IconButton>
      </Box>
      <Box sx={{ pl: 1.5, pt: 1 }}>
        <i>comment collapsed</i>
      </Box>
    </Box>
  );
}
