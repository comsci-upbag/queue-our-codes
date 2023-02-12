import { currentComponentState } from "@/globals/states";
import { useEffect, useState, Children } from "react"
import { useRecoilState } from "recoil";

export default function Sequential(props : React.PropsWithChildren<{}>) {

  const nodes = Children.toArray(props.children);
  const [renderedNodes, setRenderedNodes] = useState<React.ReactNode[]>([nodes[0]]);
  const [isCurrentComponentReady, setIsCurrentComponentReady] = useRecoilState(currentComponentState);

  useEffect(() => {

    if (isCurrentComponentReady) {
      setIsCurrentComponentReady(false);
      setRenderedNodes([...renderedNodes, nodes[renderedNodes.length]])
    }

  }, [isCurrentComponentReady])

  return (
    <>
      { renderedNodes.map(node => node)}
    </>
  )
  

}
