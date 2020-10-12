class UsersController < ApplicationController

    # before_action :find_user, :only [:update, :destroy]

    def create
        @user = User.new(user_params)
        if @user.valid?
            @user.save
            @token = JWT.encode({user_id: @user.id}, "yerrr")
            render json: {user: @user, token: @token}, status: :created
        else
            # render json: {error: "Username is already taken"}, status: :not_acceptable
            render json: {error: @user.errors.full_messages}, status: :not_acceptable
        end
    end

    private
    
    # def find_user 
    #     @user = User.find(params[:id])
    # end

    def user_params
        params.require(:user).permit(:username, :password)
    end
end
