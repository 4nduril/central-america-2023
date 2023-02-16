import React from 'react'
import Document, { Head, Html, Main, NextScript } from 'next/document'
import createEmotionCache from '../utils/createEmotionCache'
import createEmotionServer from '@emotion/server/create-instance'

class CentralAmericaGalleryDocument extends Document {
	render() {
		const { pageContext } = this.props

		return (
			<Html lang="de" dir="ltr">
				<Head>
					<meta charSet="utf-8" />
					<meta
						name="theme-color"
						content={
							pageContext ? pageContext.theme.palette.primary.main : null
						}
					/>
					<link
						rel="stylesheet"
						href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"
					/>
				</Head>
				<body>
					<Main />
					<NextScript />
				</body>
			</Html>
		)
	}
}

CentralAmericaGalleryDocument.getInitialProps = async ctx => {
	const originalRenderPage = ctx.renderPage

	// Emotion
	const cache = createEmotionCache()
	const { extractCriticalToChunks } = createEmotionServer(cache)

	ctx.renderPage = () =>
		originalRenderPage({
			// eslint-disable-next-line react/display-name
			enhanceApp: App => props => <App emotionCache={cache} {...props} />,
		})

	const initialProps = await Document.getInitialProps(ctx)
	const emotionStyles = extractCriticalToChunks(initialProps.html)
	const emotionStyleTags = emotionStyles.styles.map(style => (
		<style
			data-emotion={`${style.key} ${style.ids.join(' ')}`}
			key={style.key}
			dangerouslySetInnerHTML={{ __html: style.css }}
		/>
	))

	return {
		...initialProps,
		styles: [
			...React.Children.toArray(initialProps.styles),
			...emotionStyleTags,
		],
	}
}

export default CentralAmericaGalleryDocument
