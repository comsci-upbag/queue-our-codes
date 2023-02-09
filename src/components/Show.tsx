
interface Props {
  when: boolean,
}

export default function Show(props : React.PropsWithChildren<Props>) {
  if (props.when)
    return <>{props.children}</>

  return <></>
}
