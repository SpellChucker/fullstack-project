require 'rails_helper'

RSpec.describe User, type: :model do
  subject { User.new(email: 'email@email.com')}

  before { subject.save }

  it 'email is required' do
    subject.email = nil
    expect(subject).to_not be_valid
  end

  it 'password is required' do
    subject.password = nil
    expect(subject).to_not be_valid
  end
end
