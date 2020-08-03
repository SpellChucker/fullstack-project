require 'rails_helper'

RSpec.describe "Api::V1::Favorites", type: :request do
  describe 'GET index' do
    subject { get '/api/v1/favorites' }

    it 'returns a 401 with no auth' do
      subject
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
