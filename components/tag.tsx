interface tagType {
  tag: string;
  id: number;
}

export default function Tag({ tag, id }: tagType) {
  return <span className="bg-slate-200 w-fit mx-1"># {tag}</span>;
}
