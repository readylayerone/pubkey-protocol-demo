import React from 'react'
import { redirect } from 'react-router'
import { ensureUser } from '~/features/auth/data-access/ensure-user'
import { UiFooter } from '~/ui/ui-footer'
import type { UiHeaderLink } from '~/ui/ui-header'
import { UiLayout } from '~/ui/ui-layout'
import { UiProfileMenu } from '~/ui/ui-profile-menu'
import type { Route } from './+types/layout-app'
import { Group } from '@mantine/core'
import { WalletMultiIcon } from '@pubkeyapp/wallet-adapter-mantine-ui'

export async function loader({ request }: Route.LoaderArgs) {
  const user = await ensureUser(request)
  if (!user) {
    return redirect('/login')
  }

  return { user }
}

export default function LayoutApp({ loaderData: { user } }: Route.ComponentProps) {
  const links: UiHeaderLink[] = [
    { label: 'Dashboard', to: '/dashboard' },
    { label: 'Profile', to: '/profile' },
  ]
  if (user.admin) {
    links.push({ label: 'Admin', to: '/admin' })
  }
  return (
    <UiLayout
      basePath="/"
      headerLinks={links}
      headerProfile={
        <Group justify="center" align="center" wrap="nowrap" gap="xs">
          <WalletMultiIcon size="md" />
          <UiProfileMenu user={user} />
        </Group>
      }
      footer={<UiFooter />}
    />
  )
}
