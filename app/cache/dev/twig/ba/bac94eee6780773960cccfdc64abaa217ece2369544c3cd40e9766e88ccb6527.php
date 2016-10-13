<?php

/* @Framework/Form/form_widget_simple.html.php */
class __TwigTemplate_bb729f5a935c3b5e98c76ca648c7db146dd9a2108e4b2a614dab2d02c6f7630c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_c3c19d66eed30d4f1a08ab2f46f20048840c05dccc1a73319cbb1a11e6258f16 = $this->env->getExtension("native_profiler");
        $__internal_c3c19d66eed30d4f1a08ab2f46f20048840c05dccc1a73319cbb1a11e6258f16->enter($__internal_c3c19d66eed30d4f1a08ab2f46f20048840c05dccc1a73319cbb1a11e6258f16_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "@Framework/Form/form_widget_simple.html.php"));

        // line 1
        echo "<input type=\"<?php echo isset(\$type) ? \$view->escape(\$type) : 'text' ?>\" <?php echo \$view['form']->block(\$form, 'widget_attributes') ?><?php if (!empty(\$value) || is_numeric(\$value)): ?> value=\"<?php echo \$view->escape(\$value) ?>\"<?php endif ?> />
";
        
        $__internal_c3c19d66eed30d4f1a08ab2f46f20048840c05dccc1a73319cbb1a11e6258f16->leave($__internal_c3c19d66eed30d4f1a08ab2f46f20048840c05dccc1a73319cbb1a11e6258f16_prof);

    }

    public function getTemplateName()
    {
        return "@Framework/Form/form_widget_simple.html.php";
    }

    public function getDebugInfo()
    {
        return array (  22 => 1,);
    }
}
/* <input type="<?php echo isset($type) ? $view->escape($type) : 'text' ?>" <?php echo $view['form']->block($form, 'widget_attributes') ?><?php if (!empty($value) || is_numeric($value)): ?> value="<?php echo $view->escape($value) ?>"<?php endif ?> />*/
/* */
