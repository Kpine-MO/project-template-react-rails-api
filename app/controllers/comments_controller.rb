class CommentsController < ApplicationController
    wrap_parameters format: []
    rescue_from ActiveRecord::RecordNotFound, with: :render_not_found_response
   
    rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
    def create
         comments = Comment.create!(comment_params)
          render json: comments, status: :created
         
    end
    private

      def comment_params
        params.permit(:description, :blog_id, :user_id)
      end
      def co
          
      end

      def render_unprocessable_entity_response(invalid)
        render json: { errors: invalid.record.errors }, status: :unprocessable_entity
      end
end
