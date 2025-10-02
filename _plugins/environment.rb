module Jekyll
  class EnvironmentVariables < Generator
    def generate(site)
      site.config['env'] ||= {}
      site.config['env']['WAIVER_SCRIPT_URL'] = ENV['WAIVER_SCRIPT_URL'] || ''
    end
  end
end
