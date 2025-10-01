module Jekyll
  class EnvironmentVariables < Generator
    def generate(site)
      site.config['env'] ||= {}
      site.config['env']['GOOGLE_SCRIPT_URL'] = ENV['GOOGLE_SCRIPT_URL'] || ''
    end
  end
end
