require 'rails_helper'

RSpec.describe FavoriteImage, type: :model do
  let(:owner) { User.new(email: 'email@email.com', password: '1234')}
  subject { owner.favorite_images.new(source_id: '123', url: 'url', user: owner)}

  before { subject.save }

  it 'url is required' do
    subject.url = nil
    expect(subject).to_not be_valid
  end

  it 'source_id is required' do
    subject.source_id = nil
    expect(subject).to_not be_valid
  end
end
