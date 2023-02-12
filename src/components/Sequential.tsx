import { currentComponentState } from "@/globals/states";
import { useEffect, useState, Children } from "react"
import { useRecoilState } from "recoil";

interface Props {
  onFinished?: () => void
}

export default function Sequential(props : React.PropsWithChildren<Props>) {

  const nodes = Children.toArray(props.children);
  const [renderedNodes, setRenderedNodes] = useState<React.ReactNode[]>([nodes[0]]);
  const [isCurrentComponentReady, setIsCurrentComponentReady] = useRecoilState(currentComponentState);

  useEffect(() => {

    if (isCurrentComponentReady) {
      setIsCurrentComponentReady(false);
      setRenderedNodes([...renderedNodes, nodes[renderedNodes.length]])
    }

    if (nodes.length === renderedNodes.length && props.onFinished)
      props.onFinished()

  }, [isCurrentComponentReady])

  return (
    <>
      { renderedNodes }
    </>
  )
  

}
