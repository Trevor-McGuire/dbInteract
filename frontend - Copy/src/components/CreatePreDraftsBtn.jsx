import React from "react";
import { Link } from "react-router-dom";

const CreatePreDraftsBtn = () => {
  return (
    <Link to="/create-pre-draft">
      <button>Create New PreDraft</button>
    </Link>
  );
};

export default CreatePreDraftsBtn;
