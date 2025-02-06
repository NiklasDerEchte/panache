import { Avatar, AvatarFallback, AvatarImage } from '#common/ui/components/avatar'
import useTranslate, { useLocale } from '#common/ui/hooks/use_translate'
import Post from '#social/models/post'
import Room from '#social/models/room'
import { JoinRoomButton } from '#social/ui/components/join_room_button'
import { PostActions } from '#social/ui/components/post_actions'
import { PostActionsDropdown } from '#social/ui/components/post_actions_dropdown'
import { RoomInfo } from '#social/ui/components/room_info'
import SocialLayout from '#social/ui/components/social_layout'
import { Link } from '@inertiajs/react'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import React from 'react'
import CreateCommentForm from '../components/create_comment_form'
import { CommentCard } from '../components/comment_card'

export default function Show({ room, post }: { room: Room; post: Post }) {
  const t = useTranslate()
  const locale = useLocale()
  const timeAgo = formatDistanceToNow(new Date(post.createdAt as unknown as string), {
    addSuffix: true,
    locale: locale === 'fr' ? fr : undefined,
  })

  return (
    <SocialLayout>
      <main className="max-w-6xl mx-auto w-full p-4">
        <div className="grid sm:grid-cols-4 gap-y-4 sm:gap-y-0 gap-x-4 pt-6">
          <div className="col-span-3">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <Link className="hover:opacity-75 transition-opacity" href={`/rooms/${room.id}`}>
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`https://avatar.vercel.sh/${room.id}`}
                      alt={post.user.username}
                    />
                    <AvatarFallback>{post.user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                </Link>
                <div>
                  <div className="flex items-center gap-1 text-sm">
                    <Link
                      className="font-medium text-emerald-950 hover:text-emerald-700 transition-colors"
                      href={`/rooms/${room.id}`}
                    >
                      {room.name}
                    </Link>

                    <span className="text-muted-foreground">• {timeAgo}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{post.user.username}</p>
                </div>
              </div>
              <PostActionsDropdown post={post} />
            </div>
            <h2 className="font-semibold text-xl pt-4 lg:pr-8">{post.title}</h2>
            {post.link ? (
              <a
                className="transition-colors text-sm text-emerald-800 hover:text-emerald-600 truncate"
                href={post.link}
                target="_blank"
              >
                {post.link}
              </a>
            ) : null}
            {post.text ? <p className="prose pt-2 text-sm">{post.text}</p> : null}

            <div className="pt-2">
              <PostActions post={post} />
            </div>

            <section className="mt-6 pt-6 space-y-4 border-t">
              <div className="space-y-2">
                <h3 className="font-medium">{t('social.comments')}</h3>
                <CreateCommentForm post={post} />
              </div>

              {post.comments.map((comment) => (
                <CommentCard key={comment.id} post={post} comment={comment} />
              ))}
            </section>
          </div>
          <div className="col-span-1 w-full">
            <RoomInfo
              header={
                <header className="flex items-center justify-between gap-x-2">
                  <p className="truncate font-medium text-lg">{room.name}</p>
                  <JoinRoomButton />
                </header>
              }
              room={room}
            />
          </div>
        </div>
      </main>
    </SocialLayout>
  )
}
