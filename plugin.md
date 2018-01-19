# Prerequisites for plugins to be displayed on hyper.is/plugins

For a plugin to display nicely on the hyper.is/plugins we recommend that you have a meta `plugin` object within your `package.json` to help us show off your plugin/theme better using a Title, Caption, Preview Image, and if it's a theme, an array of colours.

To display on the Hyper Store initially, your plugin must have a keyword in your package.json keywords array to indicate that your plugin is for Hyper and whether it's a plugin or a theme.

For example:

* A plugin would contain the keyword `hyper-plugin`
* A theme would contain the keyword `hyper-theme`

Also, we now request that plugins and themes start with the `hyper-` prefix to avoid confusion.

## Example of the meta `plugin` property

```

{
  "plugin": {
    // The name of your plugin/theme
    "title": "Awesome Hyper Plugin",
    // A description of your plugin/theme
    "caption": "Makes Hyper do something awesome",
    // A preview image of your Hyper plugin/theme (it'll show as 600px in width, so we recommend making the image 1200px in width for higher density screens)
    "preview": "a.link.to/a/preview/image",
    // If your plugin is a theme, you can add an array of colors so they display for users on the Hyper Store
    "colors": [
      "#BADA55",
      "#C0FFEE"
    ]
  },
  ... The rest of your package.json ...
}
