import WithPostClient from 'components/blog/with-post-client'

export const metadata = {
  title: 'Submitting a new plugin or theme',
  description: 'How to submit a new plugin or theme to the Hyper Store',
}

const meta = {
  title: 'Submitting a new plugin or theme',
}

export default function SubmitPage() {
  return (
    <WithPostClient meta={meta}>
      <>
        <p>
          We'd love to have your Hyper plugin or theme listed in the Hyper Store!
          If you want to add your plugin or theme to the Hyper Store list, follow the instructions that follow.
        </p>
        
        <h2>Create your plugin or theme</h2>
        
        <p>
          You can find instructions and details about the process of creating a new plugin or theme in the <a href="https://github.com/vercel/hyper/blob/canary/PLUGINS.md">Hyper repository</a>.
        </p>
        
        <h2>Publish your plugin or theme to npm</h2>
        
        <p>
          For users to easily install your package, we use npm as the underlying service, therefore your plugin or theme needs to be published to npm.
          We suggest that your plugin is named with the prefix `hyper-` (for example `hyper-native`) and has either `hyper-plugin` or `hyper-theme` as a keyword depending on the type of your package.
          This will help users easily identify your package as a Hyper plugin or theme.
        </p>
        
        <p>
          Along with the previous suggestion, it'd be really helpful if your plugin is open-sourced so that the security conscious user will be able to review your code easily. To provide a repository in your `package.json` please refer to
          <a href="https://docs.npmjs.com/files/package.json#repository">npm's documentation</a>.
        </p>
        
        <h2>Submit your plugin or theme to Hyper Store</h2>
        
        <p>
          Create a pull request in <a href="https://github.com/vercel/hyper-site">the hyper-site repository</a>, in which you should edit the `plugins.json` file and add the following information:
        </p>
        
        <pre><code>
{`{
  "name": "hyper-snazzy",
  "description": "Elegant Hyper theme with bright colors",
  "type": "theme",
  "colors": [
    "#eff0eb",
    "#282a36"
  ],
  "dateAdded": "1521644449784"
}`}
        </code></pre>
        
        <p>
          Also add a preview image of your plugin or theme to the `public/store` folder. Can be a gif, png, jpeg, etc. Recommended dimensions are 600x400 pixels but it'd be perfect if you could make the density 2x for retina screens (1200x800)
        </p>
        
        <p>
          After you've edited the `plugins.json` file and uploaded the preview image, you can submit a pull-request to <a href="https://github.com/vercel/hyper-site">the repository</a> with your changes. Once you've done that, we'll review it and if it's all good, we'll accept!
        </p>
        
        <p>
          That's it, we're looking forward to seeing all of your plugins and themes added!
        </p>
      </>
    </WithPostClient>
  )
}
