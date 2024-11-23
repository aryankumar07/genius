import Link from "next/link"

const LandingPage = ()=>{
  return (
    <>
      <Link href={'/sign-in'}>
        <div>
          SignIn
        </div>
      </Link>
      <Link href={'/sign-up'}>
        <div>
          SignUp
        </div>
      </Link>
    </>
  )
}

export default LandingPage