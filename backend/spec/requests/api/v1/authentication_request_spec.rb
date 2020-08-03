require 'rails_helper'

RSpec.describe "Api::V1::AuthenticationController", type: :request do
  describe 'POST authenticate' do
    subject { post '/api/v1/authenticate' }

    it 'returns a 401 with invalid credentials' do
      subject
      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe 'POST register' do
    subject { post '/api/v1/register' }

    it 'returns a 400 with invalid params' do
      subject
      expect(response).to have_http_status(:bad_request)
    end
  end
end
