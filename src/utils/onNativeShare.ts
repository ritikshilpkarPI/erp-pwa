interface OnNativeShareProps {
  title?: string;
  text?: string;
  files: File[];
}
const onNativeShare = async ({ title, text, files }: OnNativeShareProps) => {
    if (navigator.share && navigator.canShare) {
      if (navigator.canShare({ files })) {
        try {
          await navigator.share({
            title,
            text,
            files
          });
          return true;
        } catch (error) {
          console.error('Error sharing PDF:', error);
        }
      } 
    }
    return false;
  };

export default onNativeShare;