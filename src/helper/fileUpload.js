import { ref, uploadBytesResumable, getDownloadURL } from "@firebase/storage";
import { storage } from "../config/firebase";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

const fileUpload = async (file) => {
  try {
    const fileRef = ref(storage, "notion/" + uuidv4());
    const snapshot = await uploadBytesResumable(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);

    return url;
  } catch (error) {
    toast.error("File upload error");

    return null;
  }
};

export default fileUpload;
