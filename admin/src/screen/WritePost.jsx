/* eslint-disable no-unused-vars */
import {
  Button,
  Select,
  TextInput,
  useMantineColorScheme,
} from "@mantine/core";
import useStore from "../store";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { createSlug, uploadFile } from "../utils";
import {
  Link,
  RichTextEditor,
  IconColorPicker,
  Color,
  Highlight,
  BubbleMenu,
  Placeholder,
  StarterKit,
  Subscript,
  Superscript,
  TextAlign,
  TextStyle,
  useEditor,
  Underline,
} from "./index.js";
import { BiImages } from "react-icons/bi";
///import { RichTextEditorControlsGroup } from "@mantine/tiptap";
import { Toaster, toast } from "sonner";
import { useCreatePost } from "../hooks/post-hook.js";
import Loading from "../components/LoadingOverlay.jsx";

const WritePost = () => {
  const { colorScheme } = useMantineColorScheme();
  const { user } = useStore();
  const theme = colorScheme === "dark";
  const [visible, { toggle }] = useDisclosure(false);

  const [category, setCategory] = useState("NEWS");
  const [file, setFile] = useState("");
  const [title, setTitle] = useState(null);
  const [fileURL, setfileURL] = useState(null);
  const { isPending, mutate } = useCreatePost(toast, toggle, user?.token);
  useEffect(() => {
    file && uploadFile(setfileURL, file);
  }, [file]);
  let editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Write post here ...." }),
      Underline,
      Link,
      Superscript,
      Subscript,
      Highlight,
      TextStyle,
      Color,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: "",
  });
  const handleSubmit = async () => {
    if (!fileURL || !category || !title) {
      toast.error("All Fields are required");
      return;
    }
    const slug = createSlug(title);
    mutate({
      title,
      slug,
      cat: category,
      img: fileURL,
      desc: editor.getHTML(),
    });
    console.log(mutate);
  };
  return (
    <>
      <RichTextEditor editor={editor}>
        <div className="w-full flex flex-col md:flex-row flex-wrap gap-5 mb-8">
          <TextInput
            withAsterisk
            label="Post Title"
            className="w-full flex-1"
            placeholder="Post Title"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Select
            label="Category"
            defaultValue={"NEWS"}
            placeholder="pick category"
            data={["NEWS", "SPORTS", "CODING", "EDUCATION", "FASHION"]}
            onChange={(val) => setCategory(val)}
          />
          <label
            htmlFor="imgUpload"
            className="flex items-center gap-1 text-base cursor-pointer mr-5 mt-5"
          >
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="hidden"
              id="imgUpload"
              accept=".jpg, .png, .jpeg"
              data-max-size="5120"
            />
            <BiImages />
            <span>Post Image</span>
          </label>
        </div>
        {editor && (
          <BubbleMenu editor={editor}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold></RichTextEditor.Bold>
              <RichTextEditor.Italic></RichTextEditor.Italic>
              <RichTextEditor.Link></RichTextEditor.Link>
            </RichTextEditor.ControlsGroup>
          </BubbleMenu>
        )}
        <RichTextEditor.Toolbar sticky stickyOffset={20}>
          <RichTextEditor.ColorPicker
            colors={[
              "#25262b",
              "#868e96",
              "#fa5252",
              "#e64980",
              "#be4bdb",
              "#7950f2",
              "#4c6ef5",
              "#228be6",
              "#15aabf",
              "#12b886",
              "#40c057",
              "#82c91e",
              "#fab005",
              "#fd7e14",
            ]}
          />
          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Control interactive={true}>
              <IconColorPicker size="1rem" stroke={1.5} />
            </RichTextEditor.Control>
            <RichTextEditor.Color color="#F03E3E" />
            <RichTextEditor.Color color="#7048E8" />
            <RichTextEditor.Color color="#1098AD" />
            <RichTextEditor.Color color="#37B24D" />
            <RichTextEditor.Color color="#F59F00" />
          </RichTextEditor.ControlsGroup>
          <RichTextEditor.UnsetColor />

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Bold />
            <RichTextEditor.Italic />
            <RichTextEditor.Underline />
            <RichTextEditor.Strikethrough />
            <RichTextEditor.ClearFormatting />
            <RichTextEditor.Highlight />
            <RichTextEditor.Code />
            <RichTextEditor.CodeBlock />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.H1 />
            <RichTextEditor.H2 />
            <RichTextEditor.H3 />
            <RichTextEditor.H4 />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Blockquote />
            <RichTextEditor.Hr />
            <RichTextEditor.BulletList />
            <RichTextEditor.OrderedList />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.Link />
            <RichTextEditor.Unlink />
          </RichTextEditor.ControlsGroup>

          <RichTextEditor.ControlsGroup>
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignCenter />
            <RichTextEditor.AlignLeft />
            <RichTextEditor.AlignRight />
            <RichTextEditor.Subscript />
            <RichTextEditor.Superscript />
          </RichTextEditor.ControlsGroup>
        </RichTextEditor.Toolbar>
        <RichTextEditor.Content className="py-8" />
      </RichTextEditor>
      <div className="w-full flex items-end justify-end mt-6">
        <Button
          className={theme ? "bg-blue-600" : "bg-black"}
          onClick={() => handleSubmit()}
        >
          Submit Post
        </Button>
      </div>
      <Loading visible={isPending} />
      <Toaster richColors />
    </>
  );
};

export default WritePost;
