import React from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '../utils/createEmotionCache'
import Head from 'next/head'

const clientSideEmotionCache = createEmotionCache()

const theme = createTheme()

export default function CentralAmericaGallery(props) {
	React.useEffect(() => {
		const jssStyles = document.querySelector('#jss-server-side')
		if (jssStyles && jssStyles.parentElement) {
			jssStyles.parentElement.removeChild(jssStyles)
		}
	}, [])

	// eslint-disable-next-line react/prop-types
	const { Component, pageProps, emotionCache = clientSideEmotionCache } = props
	return (
		<CacheProvider value={emotionCache}>
			<Head>
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no"
				/>
			</Head>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				<Component {...pageProps} />
			</ThemeProvider>
		</CacheProvider>
	)
}
