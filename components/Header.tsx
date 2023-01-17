import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut, useSession } from 'next-auth/react';
import Head from 'next/head';

const Header: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) =>
    router.pathname === pathname;

  const { data: session, status } = useSession();

  let left = (
    <div className="left">
      <Link href="/">
        <div className="bold" data-active={isActive('/')}>
          Feed
        </div>        
      </Link>
      <style jsx>{`
        .bold {
          font-weight: bold;
          text-decoration: none;
          color: var(--geist-foreground);
          display: inline-block;
          margin-left: 1rem;
        }

        .left .bold[data-active='true'] {
          color: gray;
        }
      `}</style>
    </div>
  );

  let right = null;

  if (status === 'loading') {
    left = (
      <div className="left">
        <Link href="/" >
          <div className="bold" data-active={isActive('/')}>
            Feed
          </div>
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            margin-left: 1rem;
          }

          .left .bold[data-active='true'] {
            color: gray;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>Validating session...</p>
        <style jsx>{`
          .right {
            margin-left: auto;
          }
        `}</style>
      </div>
    );
  }

  if (!session) {
    right = (
      <div className="right">
        <Link href="/api/auth/signin" className='login' data-active={isActive('/signup')}>
          Log in
        </Link>
        <style jsx>{`
          .login {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right .login {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }
        `}</style>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="left">
        <Link href="/" >
          <div className="bold" data-active={isActive('/')}>
            Feed
          </div>          
        </Link>
        <Link href="/drafts" >
          <div className="bold" data-active={isActive('/drafts')}>
            My drafts
          </div>          
        </Link>
        <style jsx>{`
          .bold {
            font-weight: bold;
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
            margin-left: 1rem;
          }

          .left .bold[data-active='true'] {
            color: gray;
          }
        `}</style>
      </div>
    );
    right = (
      <div className="right">
        <p>
          {session.user.name} ({session.user.email})
        </p>
        <Link href="/create">
          <button>
            New post
          </button>
        </Link>
        <button onClick={() => signOut()}>
          Log out
        </button>
        <style jsx>{`
          a {
            text-decoration: none;
            color: var(--geist-foreground);
            display: inline-block;
          }

          p {
            display: inline-block;
            font-size: 13px;
            padding-right: 1rem;
          }

          a + a {
            margin-left: 1rem;
          }

          .right {
            margin-left: auto;
          }

          .right a {
            border: 1px solid var(--geist-foreground);
            padding: 0.5rem 1rem;
            border-radius: 3px;
          }

          button {
            border: none;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>
          Blogr
        </title>
        <meta
          name="description"
          content="Blogr Next.js Prisma"
          key="desc"
        />
      </Head>
      <nav>
        {left}
        {right}
        <style jsx>{`
        nav {
          display: flex;
          padding: 2rem;
          align-items: center;
        }
      `}</style>
      </nav>
    </div>    
  );
};

export default Header;
