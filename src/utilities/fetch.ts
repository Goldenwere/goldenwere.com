import yaml from 'js-yaml'

export const fetchAndParseContent = async (path: string) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const yamlAsString = await blob.text()
  return yaml.load(yamlAsString)
}