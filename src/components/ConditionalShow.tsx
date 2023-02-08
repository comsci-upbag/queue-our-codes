
interface Props {
  shouldShow: boolean,
}

export default function ConditionalShow(props : React.PropsWithChildren<Props>) {
  if (props.shouldShow)
    return <>{props.children}</>

  return <></>
}
