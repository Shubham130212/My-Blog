import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import { Controller } from "react-hook-form";

export default function RTE({ name, control, label, defaultValue }) {

  return (
    <div className="w-full">
      {label && <label className="text-sm text-gray-500">{label}</label>}

      <Controller
        name={name}
        control={control}
        render={({ field: { onChange } }) =>(
          <Editor
            apiKey="3aqu2rpwzlyesm0iu4jh0agy7e1hz1qtf2zxe8e7skh000pi"
            initialValue={defaultValue}
            init={{
              height: 500,
              menubar: true,
              plugins: [
                "advlist autolink lists link image charmap preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | blocks | " +
                "bold italic forecolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
            }}
            onEditorChange={onChange}
         />
        )}
      />
    </div>
  );
}
